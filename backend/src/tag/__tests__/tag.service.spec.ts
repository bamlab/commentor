import { TagService } from '../tag.service';
import { Tag as TagEntity } from '../tag.entity';
import { Repository } from 'typeorm';
import { InputTag } from '../interfaces/tag.dto';

let tagService: TagService;

const mockedSave = jest
  .fn()
  .mockImplementation(
    (tag: Pick<TagEntity, 'code' | 'description' | 'color' | 'oAuthLogin'>) => tag,
  );

const mockedTagRepository: {
  save: Function;
  find: Function;
  update: Function;
  findOne: Function;
  delete: Function;
  metadata: { columns: any[]; relations: any[] };
} = {
  save: mockedSave,
  find: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  metadata: { columns: [], relations: [] },
};

describe('Tag Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tagService = new TagService(mockedTagRepository as Repository<TagEntity>);
  });
  describe('[Method] createTag', () => {
    it('should call tagRepository.save and return a tag', async () => {
      const tag = new TagEntity();
      const createdTag = await tagService.createTag(tag);
      expect(mockedSave).toHaveBeenCalled();
      expect(createdTag).toEqual(tag);
    });
  });
  describe('[Method] getByLogin', () => {
    it('should call tagRepository.find', async () => {
      const oAuthLogin = 'login';
      await tagService.getByLogin(oAuthLogin);
      expect(mockedTagRepository.find).toHaveBeenCalledTimes(1);
      expect(mockedTagRepository.find).toHaveBeenCalledWith({
        where: [{ oAuthLogin }, { isDefault: true }],
      });
    });
  });
  describe('[Method] updateById', () => {
    it('should call tagRepository.update and tagRepository.findOne', async () => {
      const tag: InputTag = {
        code: 'code',
        description: 'description',
        color: 'color',
        login: 'login',
      };
      const tagId = 1;
      const oAuthLogin = 'login';
      await tagService.updateById(tag, tagId, oAuthLogin);
      expect(mockedTagRepository.update).toHaveBeenCalledTimes(1);
      expect(mockedTagRepository.update).toHaveBeenCalledWith({ id: tagId, oAuthLogin }, tag);
      expect(mockedTagRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockedTagRepository.findOne).toHaveBeenCalledWith({ id: tagId });
    });
  });
  describe('[Method] deleteTagById', () => {
    it('should call tagRepository.delete', async () => {
      const id = 1;
      const oAuthLogin = 'login';
      await tagService.deleteTagById(id, oAuthLogin);
      expect(mockedTagRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockedTagRepository.delete).toHaveBeenCalledWith({ id, oAuthLogin, isDefault: false });
    });
  });
});
