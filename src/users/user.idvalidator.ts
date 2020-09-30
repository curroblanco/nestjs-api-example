
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Logger } from "@nestjs/common/services/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class ValIdUserPipe implements PipeTransform {

    constructor(@InjectRepository(UserEntity)
    public usersRepository: Repository<UserEntity>) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        Logger.debug(metadata);
        try {
            await this.usersRepository.findOneOrFail(value);
        }catch(err) {
            throw new BadRequestException("Id de usuario no existe");
        }

        return value;
    }

}