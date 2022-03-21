import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, In, Repository } from "typeorm";
import { User } from "../entities";

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(uuid: string[]): Promise<User[]> {
    const results = await this.userRepository.find({
      where: { uuid: In(uuid) },
    });

    return results;
  }

  async createUser(inputUser: DeepPartial<User>): Promise<User> {
    const user = this.userRepository.create(inputUser);
    return this.userRepository.save(user);
  }

  async deleteUser(uuid: string): Promise<number> {
    const result = await this.userRepository.delete({ uuid: uuid });
    if (!result.affected) {
      throw Error(`Could not delete user with uuid ${uuid}`);
    }
    return result.affected;
  }

  async updateUser(uuid: string, update: DeepPartial<User>): Promise<User> {
    const result = this.userRepository.save({ uuid: uuid, ...update });

    return result;
  }
}
