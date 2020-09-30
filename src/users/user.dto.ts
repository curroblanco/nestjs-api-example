import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly password: string;

    constructor(id: string, name: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}