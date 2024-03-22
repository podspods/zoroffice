import React from 'react';
import {describe, test} from '@jest/globals';
import DirectorBuilder from '../DirectorBuilder';
import { initUserAuthorizations, type RolesPermissions } from '../../../UserAuthorizations';

const superRolesPermissions: RolesPermissions = {
  id: '65244b95e41dc5000ceee03d',
  authorizations: {
    isSuper: true,
    permissions: {
      user: true,
      'user self update': true,
      'user personal statistics': true,
      notifications: true,
      help: true,
      'feedback submit': true,
      'translation box': true,
      'translation box settings': true,
      'translation concordance': true,
      'translation file': true,
      'translation file postedit': true,
      'translation file PDF': true,
      'user api keys': true,
      'user api credentials': true,
      'user active applications': true
    }
  }
};

const defaultUserRolesPermissions: RolesPermissions = {
  id: '65244b95e41dc5000ceee03d',
  authorizations: {
    isSuper: false,
    permissions: {
      user: true,
      'user self update': true,
      'user personal statistics': true,
      notifications: true,
      help: true,
      'feedback submit': true,
      'translation box': true,
      'translation box settings': true,
      'translation concordance': true,
      'translation file': true,
      'translation file postedit': true,
      'translation file PDF': true,
      'user api keys': true,
      'user api credentials': true,
      'user active applications': true
    }
  }
};
describe('NavCategoryDirectorBuilder: NavCategory, TranslateServerNavCategories, UserAuthorizations', () => {
  describe('with superRolesPermissions', () => {
    let director: typeof DirectorBuilder;

    beforeAll(() => {
      initUserAuthorizations(superRolesPermissions);
      director = DirectorBuilder();
    });
    test('DirectorBuilder.makeItems()', () => {
      expect(director.makeItems()).toMatchSnapshot();
    });
    test('DirectorBuilder.makeAdminItems()', () => {
      expect(director.makeAdminItems()).toMatchSnapshot();
    });
  });
  describe('with DefaultRolesPermissions', () => {
    let director: typeof DirectorBuilder;

    beforeAll(() => {
      initUserAuthorizations(defaultUserRolesPermissions);
      director = DirectorBuilder();
    });
    test('DirectorBuilder.makeItems()', () => {
      expect(director.makeItems()).toMatchSnapshot();
    });
    test('DirectorBuilder.makeAdminItems()', () => {
      expect(director.makeAdminItems()).toMatchSnapshot();
    });
  });
});
