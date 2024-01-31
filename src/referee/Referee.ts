import { Piece, PieceType, Position, TeamType } from "../Constants";

export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log("Checking if tile is occupied...");

        const piece = boardState.find((p) => p.position.x === x && p.position.y === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(
        x: number, 
        y: number, 
        boardState: Piece[], 
        team: TeamType
    ) : boolean {
        const piece = boardState.find(
            (p) => p.position.x === x && p.position.y === y && p.team !== team
        );

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find((p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);
                if (piece) {
                    return true;                
               }  
            }
        }
        return false;
    }

    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]
    ) {
        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            // movement logic
            if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
                if (
                    !this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState) && 
                    !this.tileIsOccupied(desiredPosition.x, desiredPosition.y - pawnDirection, boardState)
                ) {
                    return true;
                }
            } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
                if (!this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)) {
                    return true;
                }
            }   
            // attack logic    
            else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) {
                // attack in upper or bottom left corner
                console.log("upper / bottom left");
                if (this.tileIsOccupiedByOpponent(desiredPosition.x, desiredPosition.y, boardState, team)) {
                    return true;
                }
            } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
                // attack in the upper or bottom right corner
                console.log("upper / bottom right");
                if (this.tileIsOccupiedByOpponent(desiredPosition.x, desiredPosition.y, boardState, team)) {
                    return true;
                }
            } 
        }     
        return false;
    }
}
