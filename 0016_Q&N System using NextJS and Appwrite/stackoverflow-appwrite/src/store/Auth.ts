import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AppwriteException, ID, Models }   from 'appwrite';
import { account} from '@/models/client/config';

export interface UserPrefs {
    reputation: number;
}

interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null;
    hydrated: boolean;

    setHydrated(): void; // Mark the store as hydrated
    verifySession(): Promise<void>; //Return a promise

    login(
        email: string,
        password: string
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null;
    }>
    createAccount(
        name: string,
        email: string,
        password: string,
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null;
    }>
    logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated() {
                set({hydrated: true})
            },

            async verifySession() {
                try {
                    const session = await account.getSession("current");
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT(),
                    ]);

                    if (!user.prefs?.reputation) {
                        await account.updatePrefs<UserPrefs>({ reputation: 0 });
                    }

                    set({ session, user, jwt });
                } catch (error) {
                    const isExpiredOrMissingSession =
                        error instanceof AppwriteException && [401, 404].includes(error.code);

                    if (isExpiredOrMissingSession) {
                        set({ session: null, user: null, jwt: null });
                        useAuthStore.persist.clearStorage();
                        return;
                    }

                    console.error("Auth session verification failed:", error);
                }
            },

            async login(email: string, password: string) {
                try {
                    let currentSession: Models.Session | null = null;

                    try {
                        currentSession = await account.getSession("current");
                    } catch (error) {
                        if (
                            !(error instanceof AppwriteException) ||
                            ![401, 404].includes(error.code)
                        ) {
                            throw error;
                        }
                    }

                    if (currentSession) {
                        try {
                            const currentUser = await account.get<UserPrefs>();

                            if (currentUser.email.toLowerCase() === email.toLowerCase()) {
                                const { jwt } = await account.createJWT();
                                if (!currentUser.prefs?.reputation) {
                                    await account.updatePrefs<UserPrefs>({ reputation: 0 });
                                }

                                set({ session: currentSession, user: currentUser, jwt });
                                return { success: true };
                            }
                        } catch (error) {
                            if (
                                !(error instanceof AppwriteException) ||
                                ![401, 404].includes(error.code)
                            ) {
                                throw error;
                            }
                        }

                        await account.deleteSession("current");
                    }

                    const session = await account.createEmailPasswordSession(email, password)
                    const [user, {jwt}] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ])
                    if (!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({
                        reputation: 0
                    })

                    set({session, user, jwt})
                    return {success: true}
                } catch (error) {
                    console.log(error);
                    
                    return {
                        success: false, 
                        error: error instanceof  AppwriteException ? error : null

                    }
                }
            },

            async createAccount(name: string, email: string, password: string) {
                try {
                    await account.create(ID.unique(), email, password, name)

                    return {
                        success: true,
                        error: null,
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null,
                    }
                }
            },

            async logout() {
                try {
                    await account.deleteSession("current");
                    set({ session: null, user: null, jwt: null });
                    useAuthStore.persist.clearStorage();
                } catch (error) {
                    console.log(error);
                    set({ session: null, user: null, jwt: null });
                    useAuthStore.persist.clearStorage();
                }
            },
            
        })),
        {
            name: "auth",
            onRehydrateStorage(){
                return (state, error) => {
                    if (!error) state?.setHydrated()
                }
            }
        }
    )
)

