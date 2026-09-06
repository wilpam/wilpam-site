export interface PositionJ {
    x: number;
    y: number;
}

export class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    is(otherPosition: Position): boolean {
        return this.x === otherPosition.x &&
               this.y === otherPosition.y;
    }

    add(otherPosition: Position): Position {
      return new Position(this.x + otherPosition.x,
                          this.y + otherPosition.y)
    }

    offset(x: number, y: number): Position {
      return new Position(this.x + x,
                          this.y + y)
    }

    clone(): Position {
        return new Position(this.x, this.y);
    }

    static remake(json: PositionJ) {
        return new Position(json.x, json.y);
    }
}