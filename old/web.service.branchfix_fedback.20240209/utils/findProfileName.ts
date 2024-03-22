import {Profile} from '../app/[lang]/translationTools/UploadedFilesTable';

export const RenderProfileCell = (profiles: Profile[], rowProfile?: string) => {
  return profiles.find(profile => profile.id === rowProfile)?.name;
};
