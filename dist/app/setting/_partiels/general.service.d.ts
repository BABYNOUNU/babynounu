import { Repository } from 'typeorm';
import { SettingDto } from '../dto/setting.dto';
export declare class SettingGeneraleService {
    constructor();
    protected Verify_slug(Repository: Repository<any>, { slug }: {
        slug: string;
    }, type?: string): Promise<void>;
    settings(Repository: Repository<any>): Promise<any[]>;
    setting(Repository: Repository<any>, { slug }: {
        slug: string;
    }): Promise<any[]>;
    createSetting(Repository: Repository<any>, { createSettingBody }: {
        createSettingBody: SettingDto;
    }): Promise<{
        setting: any;
    }>;
    updateSetting(Repository: Repository<any>, { updateSettingBody }: {
        updateSettingBody: SettingDto;
    }, { slug }: {
        slug: string;
    }): Promise<{
        setting: any;
    }>;
    deleteSetting(Repository: Repository<any>, { slug }: {
        slug: string;
    }): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
