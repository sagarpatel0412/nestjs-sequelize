import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDataStatusInput } from './dto/create-data-status.input';
import { UpdateDataStatusInput } from './dto/update-data-status.input';
import { InjectModel } from '@nestjs/sequelize';
import { DataStatusModel } from './model/data-status.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DataStatusService {
  constructor(
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createDataStatus(
    inputs: CreateDataStatusInput,
  ): Promise<DataStatusModel> {
    const isStatusNumber = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (isStatusNumber) {
      throw new ConflictException(`this status number already exists`);
    } else {
      const isValueInfo = await this.dataStatusModel.findOne({
        where: { value_info: inputs.value_info },
      });
      if (isValueInfo) {
        throw new ConflictException(`this value info already exists`);
      } else {
        const dataStatusInput = new DataStatusModel();
        dataStatusInput.title = inputs.title;
        dataStatusInput.description = inputs.description;
        dataStatusInput.status_number = inputs.status_number;
        dataStatusInput.value_info = inputs.value_info;
        dataStatusInput.status = inputs.status;
        const dataStatusContent = await this.dataStatusModel.create(
          dataStatusInput.dataValues,
        );
        return dataStatusContent;
      }
    }
  }

  public async getDataStatuses(): Promise<Array<DataStatusModel>> {
    const isDataStatus = await this.dataStatusModel.findAll();
    return isDataStatus;
  }

  public async getDataStatus(id: string): Promise<DataStatusModel> {
    const isDataStatus = await this.dataStatusModel.findOne({ where: { id } });
    if (isDataStatus === null) {
      throw new NotFoundException(`data not found`);
    } else {
      return isDataStatus;
    }
  }

  public async updateDataStatus(
    id: string,
    inputs: UpdateDataStatusInput,
  ): Promise<DataStatusModel> {
    const isDataStatus = await this.dataStatusModel.findOne({ where: { id } });
    if (!isDataStatus) {
      throw new NotFoundException(`data with ${id} not found`);
    } else {
      const isStatusNumber = await this.dataStatusModel.findOne({
        where: { status_number: inputs.status_number },
      });
      if (isStatusNumber) {
        throw new ConflictException(`this status number already exists`);
      } else {
        const isValueInfo = await this.dataStatusModel.findOne({
          where: { value_info: inputs.value_info },
        });
        if (isValueInfo) {
          throw new ConflictException(`this value info already exists`);
        } else {
          isDataStatus.title = inputs.title;
          isDataStatus.description = inputs.description;
          isDataStatus.status_number = inputs.status_number;
          isDataStatus.value_info = inputs.value_info;
          isDataStatus.status = inputs.status;
          await this.dataStatusModel.update(isDataStatus.dataValues, {
            where: { id },
          });
          return isDataStatus;
        }
      }
    }
  }

  public async deleteDataStatus(id: string): Promise<DataStatusModel> {
    const isDataStatus = await this.dataStatusModel.findOne({
      where: { id },
    });
    if (!isDataStatus) {
      throw new NotFoundException(`contact with ${id} not found`);
    } else {
      await this.dataStatusModel.destroy({
        where: { id },
      });
      return isDataStatus;
    }
  }
}
