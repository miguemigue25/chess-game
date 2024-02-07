import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent, tileIsOccupiedByOpponent } from "./GeneralRules";


export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for (let i = 1; i < 8; i++) {
        // up right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y + i);
            // check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
                // dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                // dealing with passing tile
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        // bottom right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y - i);
            // check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
                // dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        // bottom left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y - i);
            // check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
                // dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        // top left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y + i);
            // check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
                // dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
    }
    return false;
}

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // upper right movement
    for (let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x + i, bishop.position.y + i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // bottom right movement
    for (let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x + i, bishop.position.y - i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // bottom left movement
    for (let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x - i, bishop.position.y - i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // top left movement
    for (let i = 1; i < 8; i++) {
        const destination = new Position (bishop.position.x - i, bishop.position.y + i);

        if (!tileIsOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}
