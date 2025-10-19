import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './types/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { promises as fs } from 'fs';
import { join } from 'path';

const DATA_PATH = join(__dirname, '../../products.json');

@Injectable()
export class ProductsService {
  private async readData(): Promise<Product[]> {
    try {
      const raw = await fs.readFile(DATA_PATH, 'utf8');
      return JSON.parse(raw) as Product[];
    } catch {
      await fs.writeFile(DATA_PATH, '[]', 'utf8');
      return [];
    }
  }

  private async writeData(data: Product[]): Promise<void> {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  }

  async findAll(): Promise<Product[]> {
    return this.readData();
  }

  async findOne(id: number): Promise<Product> {
    const items = await this.readData();
    const product = items.find((p) => p.id === id);
    if (!product) throw new NotFoundException('Товар не найден');
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const items = await this.readData();
    const newProduct: Product = { id: Date.now(), ...dto };
    items.push(newProduct);
    await this.writeData(items);
    return newProduct;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const items = await this.readData();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Товар не найден');
    const updatedProduct = { ...items[index], ...dto };
    items[index] = updatedProduct;
    await this.writeData(items);
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const items = await this.readData();
    const filtered = items.filter((p) => p.id !== id);
    if (filtered.length === items.length)
      throw new NotFoundException('Товар не найден');
    await this.writeData(filtered);
  }

  async getCategories(): Promise<string[]> {
    const items = await this.readData();
    return [...new Set(items.map((p) => p.category))];
  }
}
