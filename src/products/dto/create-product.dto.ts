import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Nike Air Max', description: 'Название товара' })
  @IsString()
  title: string;

  @ApiProperty({ example: 149.99, description: 'Цена товара' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Удобные кроссовки для бега',
    description: 'Описание товара',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'shoes', description: 'Категория товара' })
  @IsString()
  category: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL изображения',
  })
  @IsUrl()
  image: string;
}
