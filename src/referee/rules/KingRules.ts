import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent, tileIsOccupiedByOpponent } from "./GeneralRules";


export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for (let i =1; i < 2; i++) {
        // diagonal
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
        let passedPosition = new Position(initialPosition.x + (i * multiplierX),initialPosition.y + (i * multiplierY));

        if (passedPosition.samePosition(desiredPosition)) {
            if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                return true;
            }
        } else {
            if (tileIsOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;
}

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // top movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x, king.position.y + i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // bottom movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x, king.position.y - i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // left movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x - i, king.position.y);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x + i, king.position.y);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // upper right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x + i, king.position.y + i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // bottom right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x + i, king.position.y - i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // bottom left movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x - i, king.position.y - i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // top left movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x - i, king.position.y + i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}

// in this method the enemy moves have already been calculated
export const getCastlingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    if (king.hasMoved) return possibleMoves;

    // we get the rooks from the king's team which havent moved
    const rooks = boardState.filter(p => p.isRook && p.team === king.team && !p.hasMoved);

    // loop through the rooks
    for (const rook of rooks) {
        // determine if we need to go to the right or the left side
        const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;

        const adjacentPosition = king.position.clone();
        adjacentPosition.x =+ direction;

        if (!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;
        // we know that the rook can move to the adjacent side of the king
        const conceringTiles = rook.possibleMoves.filter(m => m.y === king.position.y);
        // checking if any of the enemy pieces can attack the spaces between the rook and the king
        const enemyPieces = boardState.filter(p => p.team !== king.team);

        let valid = true;

        for (const enemy of enemyPieces) {
            if (enemy.possibleMoves === undefined) continue;

            for (const move of enemy.possibleMoves) {
                if (conceringTiles.some(t => t.samePosition(move))) {
                    valid = false;
                }
                if (!valid)
                    break;
            }
            if (!valid) 
                break;
        }
        if (!valid) continue;

        // we now want to add it as a possible move
        possibleMoves.push(rook.position.clone());
    }
    return possibleMoves;
}
