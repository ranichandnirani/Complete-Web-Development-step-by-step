function customRender(reactElement, container) {
    // const domElement = document.createElement(reactElement.type)

    // domElement.innerHTML = reactElement.children
    // domElement.setAttribute('href', reactElement.props.href)
    // domElement.setAttribute('target', reactElement.props.target)
    // container.appendChild(domElement)

    const domeElement = document.createElement(reactElement.type)
    domeElement.innerHTML = reactElement.children
    for (const prop in reactElement.props) {
        if(prop === 'children') continue

        domeElement.setAttribute(prop, reactElement.props[prop])
    }
    container.appendChild(domeElement)
}

const reactElement = {
    type: 'a',
    props: {
        href: 'https://www.google.com',
        target: '_blank'
    },
    children: 'Click me!'
}

const mainContaine = document.querySelector('#root')

customRender(reactElement, mainContaine)