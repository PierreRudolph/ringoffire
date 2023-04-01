export class Game {
    public players: string[] = [];
    public playerImages: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string = '';
    public pickCardAnimation: boolean = false;

    constructor() {
        for (let i = 1; i <= 1; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffleArray(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            playerImages: this.playerImages,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation
        }
    }
}

function shuffleArray(array: string[]) {
    array.sort(() => Math.random() - 0.5);
    return array;
}