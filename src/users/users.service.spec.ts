import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('サービスが定義されているべき', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('ユーザーの配列を返すべき', async () => {
      const result = [new User()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('単一のユーザーを返すべき', async () => {
      const result = new User();
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('ユーザーが見つからない場合はnullを返すべき', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(await service.findOne(1)).toBeNull();
    });
  });

  describe('create', () => {
    it('新しいユーザーを作成すべき', async () => {
      const user: Partial<User> = { name: 'Test User' };
      const newUser = new User();
      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);

      expect(await service.create(user)).toBe(newUser);
    });
  });

  describe('update', () => {
    it('ユーザーを更新すべき', async () => {
      const user: Partial<User> = { name: 'Updated User' };
      const updatedUser = new User();
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedUser);

      expect(await service.update(1, user)).toBe(updatedUser);
    });
  });

  describe('delete', () => {
    it('ユーザーを削除すべき', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 , raw: [] });

      expect(await service.delete(1)).toBe(true);
    });

    it('ユーザーが見つからない場合はfalseを返すべき', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 , raw: [] });

      expect(await service.delete(1)).toBe(false);
    });
  });
});