import { PrismaService } from './../../database/PrismaService';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import axios from 'axios';
import { stateConverter } from './stateConverter';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(data: UserDTO) {
    if (data.name.length < 2 || data.name.length > 100) {
      throw new Error('Please, enter a valid number');
    }

    function getUserAge(dataNasc) {
      var currentDate = new Date();
      var dateParts = dataNasc.split('/');
      var age = currentDate.getFullYear() - dateParts[2];

      if (currentDate.getMonth() + 1 < dateParts[1]) {
        age--;
      } else {
        if (currentDate.getMonth() + 1 == dateParts[1]) {
          if (new Date().getDate() < dateParts[0]) {
            age--;
          }
        }
      }
      return age;
    }

    const userAge = getUserAge(data.birthdate);

    if (userAge <= 18 ) {
      throw new Error('sorry, 18+ only');
    }

    const getInformationsFromZipcode = await axios
      .get(`https://viacep.com.br/ws/${data.zipcode}/json/`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    const getFullNameState = stateConverter(getInformationsFromZipcode.uf);
    if (data.zipcode) {
      data.street = getInformationsFromZipcode.logradouro;
      data.neighborhood = getInformationsFromZipcode.bairro;
      data.city = getInformationsFromZipcode.localidade;
      data.state = getFullNameState;
    }

    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: UserDTO) {
    const userExists = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  delete(id: number) {
    const userExists = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
