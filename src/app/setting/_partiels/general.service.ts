import slugify from 'slugify';
import { User } from 'src/app/user/user.model';
import { Repository } from 'typeorm';
import { SettingGuardSchedules } from '../models/setting_guard_schedule.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SettingDto } from '../dto/setting.dto';
import { SlugUtils } from 'src/utils/slug.utils';

@Injectable()
export class SettingGeneraleService {
  constructor() {}

  protected async Verify_slug(
    Repository: Repository<any>,
    { slug }: { slug: string },
    type?:string
  ) {

    type = !type ? "Setting" : type

    //Verify if setting slug exist
    const IsSlugExist = await Repository.findOne({
      where: { slug },
    });

    if (!IsSlugExist) {
      throw new BadRequestException({ message: type + ' slug not exist' });
    }
  }

  async settings(Repository: Repository<any>) {
    return await Repository.find();
  }

  async setting(Repository: Repository<any>, { slug }: { slug: string }) {
    return await Repository.find({ where: { slug: slug } });
  }

  // Create Setting
  async createSetting(
    Repository: Repository<any>,
    { createSettingBody }: { createSettingBody: SettingDto },
  ) {
    //Verify if setting name exist
    const IsNameExist = await Repository.findOne({
      where: { name: createSettingBody.name.toLowerCase() },
    });

    if (IsNameExist) {
      throw new BadRequestException({ message: 'Setting name already exist' });
    }

    createSettingBody.slug = await new SlugUtils().all(
      createSettingBody.name,
      Repository,
    );

    // CREATE NEW SETTING
    const newSetting = Repository.create({
      slug: createSettingBody.slug,
      name: createSettingBody.name,
      description: createSettingBody.description,
    });
    const settingSave = await Repository.save(newSetting);
    if (!settingSave) {
      throw new BadRequestException({ message: 'Setting not created' });
    }

    // RETURN DATA USER CREATE
    return {
      setting: {
        ...settingSave,
      },
    };
  }

  // Update Setting
  async updateSetting(
    Repository: Repository<any>,
    { updateSettingBody }: { updateSettingBody: SettingDto },
    { slug }: { slug: string },
  ) {
    //Verify if setting slug exist
    await this.Verify_slug(Repository, { slug });

    // UPDATE SETTING
    const updateSetting = await Repository.update(
      { slug },
      {
        name: updateSettingBody.name,
        description: updateSettingBody.description,
      },
    );

    if (!updateSetting.affected) {
      throw new BadRequestException({ message: 'Setting not updated' });
    }

    // RETURN DATA SETTING UPDATE
    return {
      setting: {
        ...(await Repository.findOne({ where: { slug: slug } })),
      },
    };
  }

  // Delete Setting
  async deleteSetting(
    Repository: Repository<any>,
    { slug }: { slug: string },
  ) {
    //Verify if setting slug exist
    await this.Verify_slug(Repository, { slug });

    // DELETE SETTING
    const deleteSetting = await Repository.delete({ slug });

    if (!deleteSetting.affected) {
      throw new BadRequestException({ message: 'Setting not deleted' });
    }

    // RETURN DATA SETTING UPDATE
    return {
      setting: {
        slug,
        message: 'Setting deleted',
      },
    };
  }
}
