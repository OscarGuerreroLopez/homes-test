import { Injectable } from "@nestjs/common";
import { CreateHttpInput } from "./dto/create-http.input";
import { UpdateHttpInput } from "./dto/update-http.input";

@Injectable()
export class HttpService {
  create(createHttpInput: CreateHttpInput) {
    return "This action adds a new http";
  }

  findAll() {
    return `This action returns all http`;
  }

  findOne(id: number) {
    return `This action returns a #${id} http`;
  }

  update(id: number, updateHttpInput: UpdateHttpInput) {
    return `This action updates a #${id} http`;
  }

  remove(id: number) {
    return `This action removes a #${id} http`;
  }
}
