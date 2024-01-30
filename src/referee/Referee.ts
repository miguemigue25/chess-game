import { Piece, PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log("Checking if tile is occupied...");

        const piece = boardState.find((p) => p.x === x && p.y === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    TileIsOccupiedByOpponent(
        x: number, 
        y: number, 
        boardState: Piece[], 
        team: TeamType
    ) : boolean {
        const piece = boardState.find(
            (p) => p.x === x && p.y === y && p.team !== team
        );

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
                const piece = boardState.find((p) => p.x === x && p.y === y - pawnDirection && p.enPassant);
                if (piece) {
                    return true;                
               }  
            }
        }

        // if the attacking piece is a pawn (Done)
        // upper left / upper right || bottom left / bottom right (Done)
        // if a piece is under / above the attacked tile (Done)
        // if the attacked piece has made an en passant moce in the previous turn (Done)

        // put piece in correct position
        // remove en oassanted piece

        return false;
    }

    isValidMove(
        px: number, 
        py: number, 
        x: number, 
        y: number, 
        type: PieceType, 
        team: TeamType,
        boardState: Piece[]
    ) {
        // console.log("Referee is checking the move...");
        // console.log(`Previous location: (${px}, ${py})`);
        // console.log(`Current location: (${x}, ${y})`);
        // console.log(`Piece type: ${type}`);
        // console.log(`Team: ${team}`);

        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            // movement logic
            if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
                if (
                    !this.tileIsOccupied(x, y, boardState) && 
                    !this.tileIsOccupied(x, y - pawnDirection, boardState)
                ) {
                    return true;
                }
            } else if (px === x && y - py === pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }   
            // attack logic    
            else if (x - px === -1 && y - py === pawnDirection) {
                // attack in upper or bottom left corner
                console.log("upper / bottom left");
                if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
                    return true;
                }
            } else if (x - px === 1 && y - py === pawnDirection) {
                // attack in the upper or bottom right corner
                console.log("upper / bottom right");
                if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
                    return true;
                }
            } 
        }     
        return false;
    }
}
