export class Game {
    public players: string[] = ['Hans', 'Peter', 'Freddy'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i <= 13; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffleArray(this.stack);
    }


}

function shuffleArray(array: string[]) {
    array.sort(() => Math.random() - 0.5);
    return array;
}