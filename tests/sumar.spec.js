function sumar(numA, numB) {
    return numA + numB;
}

describe('Test para la funcion sumar', () => {
    it('la funcion sumar retorna la suma de dos numeros', () => {
        const resultado = sumar(4, 5);
        expect(resultado).toBe(9);
        expect(sumar(2, 3)).toBe(5);
    });


});