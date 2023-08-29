
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDtoSwagger {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginResponseSwagger {
  @ApiProperty()
  access_token: string;
}