import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";


export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for (let i = 1; i < 8; i++) {
        // up right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
            // check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
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
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
            // check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
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
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
            // check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
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
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
            // check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
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
