import slugify from 'slugify';
import { User } from 'src/app/user/user.model';
import { Repository } from 'typeorm';

export class SlugUtils {
  constructor() {}

  async slug(text: string, Repository: Repository<User>) {
    let newSlug: object | null;
    const _slug = slugify(`${text}-${Math.random().toString().substr(2, 6)}`, {
      replacement: '-',
      lower: true,
      trim: true,
      strict: false,
    });

    do {
      newSlug = await Repository.findOne({
        where: { slug: _slug },
      });
    } while (newSlug);

    return _slug;
  }


  async all(text: string, Repository: Repository<any>) {
    let newSlug: object | null;
    const _slug = slugify(`${text}-${Math.random().toString().substr(2, 6)}`, {
      replacement: '-',
      lower: true,
      trim: true,
      strict: false,
    });

    do {
      newSlug = await Repository.findOne({
        where: { slug: _slug },
      });
    } while (newSlug);

    return _slug;
  }
}
