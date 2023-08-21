function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Søknad om tilleggsstønad til barnepass';

    return element;
}

document.body.appendChild(component());