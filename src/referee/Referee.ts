import { samePosition, Piece, PieceType, Position, TeamType } from "../Constants";

export default class Referee {
    tileIsEmptyOrOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType) {
        return (
            !this.tileIsOccupied(position, boardState) ||
            this.tileIsOccupiedByOpponent(position, boardState, team)
        );
    }
    
    tileIsOccupied(position: Position, boardState: Piece[]): boolean {
        console.log("Checking if tile is occupied...");

        const piece = boardState.find((p) => samePosition(p.position, position));
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(
        position: Position,
        boardState: Piece[], 
        team: TeamType
    ) : boolean {
        const piece = boardState.find(
            (p) => samePosition(p.position, position) && p.team !== team
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
                    !this.tileIsOccupied(desiredPosition, boardState) && 
                    !this.tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y - pawnDirection}, boardState)
                ) {
                    return true;
                }
            } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
                if (!this.tileIsOccupied(desiredPosition, boardState)) {
                    return true;
                }
            }   
            // attack logic    
            else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) {
                // attack in upper or bottom left corner
                console.log("upper / bottom left");
                if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
                    return true;
                }
            } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
                // attack in the upper or bottom right corner
                console.log("upper / bottom right");
                if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
                    return true;
                }
            } 
        } else if (type === PieceType.KNIGHT) {
            for (let i = -1; i < 2; i += 2) {
                for (let j = -1; j < 2; j += 2) {
                    // top and bottom side movement 
                    if (desiredPosition.y - initialPosition.y === 2 * i) {
                        if (desiredPosition.x - initialPosition.x === j) {
                            if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                                return true;
                            }
                        }
                    }

                    // right and left side movement
                    if (desiredPosition.x - initialPosition.x === 2 * i) {
                        if (desiredPosition.y - initialPosition.y === j) {
                            if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                                return true;
                            }
                        }
                    }
                }
            }
        } else if (type === PieceType.BISHOP) {
            // movement and attack logic for the bishop

            for (let i = 1; i < 8; i++) {
                // up right movement
                if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                    let passedPosition: Position  = {x: initialPosition.x + i, y: initialPosition.y + i};
                    // check if the tiles is the tile destination
                    if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                        // dealing with destination tile
                        if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                            return true;
                        }
                    } else {
                        // dealing with passing tile
                        if (this.tileIsOccupied(passedPosition, boardState)) {
                            break;
                        }
                    }
                }
                // bottom right movement
                if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                    let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
                    // check if the tile is the destination tile
                    if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                        // dealing with destination tile
                        if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                            return true;
                        }
                    } else {
                        if (this.tileIsOccupied(passedPosition, boardState)) {
                            break;
                        }
                    }
                }
                // bottom left movement
                if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                    let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
                    // check if the tile is the destination tike
                    if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                        // dealing with destination tile
                        if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                            return true;
                        }
                    } else {
                        if (this.tileIsOccupied(passedPosition, boardState)) {
                            break;
                        }
                    }
                }
                // top left movement
                if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                    let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
                    // check if the tile is the destination tile
                    if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                        // dealing iwth destination tile
                        if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                            return true;
                        }
                    } else {
                        if (this.tileIsOccupied(passedPosition, boardState)) {
                            break;
                        }
                    }
                }
            }
        } 
        return false;
    }
}
