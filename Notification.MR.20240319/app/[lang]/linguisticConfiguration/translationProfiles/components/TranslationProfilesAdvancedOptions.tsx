import {useContext} from 'react';
import {TranslationProfilesContext} from '../context/TranslationProfilesContext';
import {getProfilesPermission} from './TranslationProfilesContainer';
import {Box} from '@mui/material';
import TranslationProfilesRowOptions, {TemplateRows} from './TranslationProfilesRowOptions';
import {
  Dictionaries,
  FilterOptions as FilterOptionsPropType,
  LinguisticOptions as LinguisticOptionsPropType,
  Normalizations,
  ProfileOnChangeOptionsType,
  ResourceOptions,
  TranslationMemories
} from '../context/TranslationProfilesAddContext';
import compact from 'lodash/compact';

export type ResourceOptionsMapField = {
  title: string;
  resourceType?: string;
  permission?: boolean;
  link?: string;
  formatResourceId?: (id: string) => string;
  target?: string | string[];
  fields: Array<TemplateRows>;
};

export type ResourcesOptionsListsType = {
  dictionaries?: Dictionaries;
  normalizations?: Normalizations;
  translationMemories?: TranslationMemories;
  linguisticOptions?: LinguisticOptionsPropType;
} & FilterOptionsPropType;

type ResourcesOptionsTypeOnChangeParams = {filterOptions?: FilterOptionsPropType; resourcesOptions?: ResourceOptions; enabledNFA?: boolean};
type ResourcesOptionsType = {
  dataRow?: ResourceOptions & FilterOptionsPropType;
  enabledNFA?: boolean;
  id: string;
  lists?: ResourcesOptionsListsType;
  onChange: (value: ResourcesOptionsTypeOnChangeParams) => void;
  supportDictionaries?: boolean;
  supportNormalization?: boolean;
  supportTranslationMemories?: boolean;
  source?: string;
  target?: string;
};

export type ResourcesOptionsRowsResultsKey = 'dictionaries' | 'normalizations' | 'translationMemories' | 'linguisticOptions';
export type ResourcesOptionsRowsResults = {
  [key in ResourcesOptionsRowsResultsKey]?: ResourceOptionsMapField;
};

const resourcesOptionsRows = (props: ResourcesOptionsType) => {
  const context = useContext(TranslationProfilesContext);
  const {source = '', target = '', lists} = props;
  const {hasCreateDictionariesPermission, hasCreateNormalizationsPermission, hasCreateTMPermission} = getProfilesPermission();
  return {
    dictionaries: {
      title: 'Dictionaries',
      resourceType: 'UD',
      permission: hasCreateDictionariesPermission,
      link: '/linguisticConfiguration/resources/dictionary',
      formatResourceId: (id: string) => `gdict_${context.data.connectedUserId}_${id}`,
      target,
      fields: [
        {
          type: 'multiValuesOption', // TODO: remove type & give Component class instead
          hasSwitch: false,
          name: 'dictionaries',
          enabled: true,
          values: lists?.dictionaries
        }
      ]
    },
    normalizations: {
      title: 'Normalizations',
      resourceType: 'NORM',
      permission: hasCreateNormalizationsPermission,
      link: '/linguisticConfiguration/resources/normalization',
      formatResourceId: (id: string) => `gdict-norm-${source}_${context.data.connectedUserId}_${id}`,
      target,
      fields: [
        {
          type: 'multiValuesOption',
          hasSwitch: false,
          name: 'normalizations',
          enabled: true,
          values: lists?.normalizations
        }
      ]
    },
    translationMemories: {
      title: 'Translation Memories',
      resourceType: 'TM',
      permission: hasCreateTMPermission,
      link: '/linguisticConfiguration/resources/translationMemory',
      formatResourceId: (id: string) => id,
      target: [target],
      fields: [
        {
          type: 'multiValuesOption',
          hasSwitch: false,
          name: 'translationMemories',
          enabled: true,
          values: lists?.translationMemories,
          showNFAToogle: context.data.enabledProfilesNFA
        }
      ]
    }
  } as ResourcesOptionsRowsResults;
};
const filterOptionsRows = () => {
  return {
    formatting: {
      title: 'Formatting',
      fields: [
        {
          type: 'select',
          hasSwitch: true,
          label: 'Preserve textual formatting',
          name: 'textualFormattingName',
          values: [
            {value: 'none', label: 'None'},
            {value: 'keep', label: 'Keep spaces'},
            {value: 'segmenting', label: 'Segmenting spaces'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: 'Line Feed definition',
          name: 'feedDefinitionName',
          values: [
            {value: 'wrapped', label: 'Wrapped'},
            {value: 'line', label: 'Not Wrapped'},
            {value: 'auto_detection', label: 'Auto detection'}
          ]
        },
        {
          type: 'text',
          hasSwitch: true,
          label: 'Segmentation character list',
          name: 'segmentCharacterName',
          values: '·,•,|'
        }
      ]
    },
    noTranslateOptions: {
      title: 'Do Not Translate Options',
      fields: [
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Foreign sentence detection by Office language markup',
          name: 'languageMarkupName'
        },
        {
          type: 'select',
          hasSwitch: true,
          label: 'Foreign sentence detection based on NFW count',
          name: 'nFWCountName',
          values: [
            {value: 'noDetection', label: 'No detection of foreign language sentence from NFW words'},
            {value: 'detection', label: 'Detection of foreign language sentence from NFW words'}
          ]
        },
        {
          type: 'text',
          hasSwitch: true,
          label: 'Do Not Translate font list',
          name: 'noFontListName',
          defaultValue: 'Symbol,Wingdings,Webdings'
        },
        {
          type: 'text',
          hasSwitch: true,
          label: 'Do Not Translate style list',
          name: 'noStyleListName',
          defaultValue: ''
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Do Not Translate addresses',
          name: 'noTranslateAddressesName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Do Not Translate capitalized words',
          name: 'noTranslateCapitalizedWordsName'
        }
      ]
    }
  } as ResourcesOptionsRowsResults;
};
const linguisticOptionsRows = (source: string, target: string) => {
  return {
    sourceAnalysis: {
      title: 'Source Analysis',
      fields: [
        {
          type: 'select',
          hasSwitch: true,
          label: 'Translation Memory match',
          name: 'memoryMatchName',
          values: [
            {value: 'normal', label: 'Normal'},
            {value: 'strict', label: 'Strict'},
            {value: 'flexible', label: 'Flexible'}
          ]
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Source spellcheck',
          name: 'sourceSpellCheckName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Acronym detection',
          name: 'acronymDetectionName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Named entity recognition',
          name: 'entityRecognitionName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Global entity recognition',
          name: 'globalRecognitionName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Enable Domain detection',
          name: 'domainDetectionName'
        }
      ]
    },
    countryLocalization: {
      title: 'Country Localization',
      fields: compact([
        (source === 'zh' || source === 'zt' || target === 'zh' || target === 'zt') && {
          type: 'select',
          hasSwitch: true,
          label: 'Chinese',
          name: 'chineseName',
          values: [
            {value: 'simple', label: 'Simplified Chinese'},
            {value: 'traditional', label: 'Traditional Chinese'}
          ]
        },
        (source === 'en' || target === 'en') && {
          type: 'select',
          hasSwitch: true,
          label: 'English',
          name: 'englishName',
          values: [
            {value: 'american', label: 'American English'},
            {value: 'british', label: 'British English'}
          ]
        },
        (source === 'pt' || target === 'pt') && {
          type: 'select',
          hasSwitch: true,
          label: 'Portuguese',
          name: 'portugueseName',
          values: [
            {value: 'brazil', label: 'Brazilian Portuguese'},
            {value: 'european', label: 'European Portuguese'}
          ]
        },
        (source === 'es' || target === 'es') && {
          type: 'select',
          hasSwitch: true,
          label: 'Spanish',
          name: 'spanishName',
          values: [
            {value: 'international', label: 'International Spanish'},
            {value: 'castilian', label: 'Castilian'}
          ]
        }
      ])
    },
    rendering: {
      title: 'Rendering',
      fields: [
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Localize punctuation',
          name: 'localizePunctuationName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Convert Hijri dates',
          name: 'convertDateName'
        },
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Not Found Word transliteration',
          name: 'transliterationName'
        }
      ]
    },
    imperative: {
      title: 'Imperative',
      fields: [
        {
          type: 'select',
          hasSwitch: true,
          label: 'French/German/Italian/Spanish/Portuguese',
          name: 'europeanChoiceName',
          values: [
            {value: 'imperative', label: 'Imperative'},
            {value: 'infinitive', label: 'Infinitive'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: 'Chinese/Japanese/Korean',
          name: 'asiaChoiceName',
          values: [
            {value: 'polite', label: 'Polite'},
            {value: 'informal', label: 'Informal'}
          ]
        }
      ]
    },
    pronouns: {
      title: 'Pronouns',
      fields: [
        {
          type: 'select',
          hasSwitch: true,
          label: '1st person singular gender',
          name: 'singularName',
          values: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: '1st person plural gender',
          name: 'pluralName',
          values: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: '2nd person gender',
          name: 'genderName',
          values: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: 'Use singular or plural for 2nd person',
          name: 'singularAndPluralName',
          values: [
            {value: 'singular', label: 'Singular'},
            {value: 'plural', label: 'Plural'}
          ]
        },
        {
          type: 'select',
          hasSwitch: true,
          label: '2nd person polite/informal',
          name: 'inputPoliteOrInformalName',
          values: [
            {value: 'polite', label: 'Polite'},
            {value: 'informal', label: 'Informal'}
          ]
        }
      ]
    },
    styleParameters: {
      title: 'Style Parameters',
      fields: [
        {
          type: 'checkbox',
          hasSwitch: true,
          label: 'Separate translation of sentences between quotation marks',
          name: 'separateTranslationName'
        },
        {
          type: 'select',
          hasSwitch: true,
          label: 'Document type',
          name: 'documentTypeName',
          values: [
            {value: 'default', label: 'Default'},
            {value: 'abstract', label: 'Abstract'},
            {value: 'list', label: 'List'},
            {value: 'journalism_title', label: 'Journalism'},
            {value: 'usermanual', label: 'User Guide'},
            {value: 'correspondance', label: 'Correspondance'}
          ]
        }
      ]
    }
  } as ResourcesOptionsRowsResults;
};

export function ResourcesOptions(props: ResourcesOptionsType) {
  const resourcesOptionsRow = resourcesOptionsRows(props);
  if (!props.supportDictionaries) {
    delete resourcesOptionsRow.dictionaries;
  }
  if (!props.supportTranslationMemories) {
    delete resourcesOptionsRow.translationMemories;
  }
  if (!props.supportNormalization) {
    delete resourcesOptionsRow.normalizations;
  }
  const resourcesOptionsProps = {...props, rows: resourcesOptionsRow};

  const onChange = (value: ProfileOnChangeOptionsType) => {
    if (value.hasOwnProperty('enabledNFA')) {
      props.onChange({enabledNFA: value.enabledNFA});
      return;
    }
    props.onChange({resourcesOptions: {...props.dataRow, ...value.resourcesOptions}});
  };

  return <TranslationProfilesAdvancedOptions type='resourcesOptions' {...resourcesOptionsProps} onChange={onChange} />;
}

export function FilterOptions(props: ResourcesOptionsType) {
  const filterOptionsProps = {...props, rows: filterOptionsRows()};
  const onChange = (value: ResourcesOptionsTypeOnChangeParams) => {
    props.onChange({filterOptions: {...props.dataRow, ...value.filterOptions}});
  };
  return <TranslationProfilesAdvancedOptions {...filterOptionsProps} type='filterOptions' onChange={onChange} />;
}

export function LinguisticOptions({source = '', target = '', ...props}: ResourcesOptionsType) {
  const linguisticOptionsProps = {...props, rows: linguisticOptionsRows(source, target)};
  return <TranslationProfilesAdvancedOptions {...linguisticOptionsProps} type='linguisticOptions' />;
}

type TranslationProfilesAdvancedOptionsType = ResourcesOptionsType & {
  type: 'resourcesOptions' | 'filterOptions' | 'linguisticOptions';
  rows: ResourcesOptionsRowsResults;
  profileName?: string;
  disabled?: boolean;
  onChange: (e: ProfileOnChangeOptionsType) => void;
};

export default function TranslationProfilesAdvancedOptions({rows, disabled = false, source = '', ...props}: TranslationProfilesAdvancedOptionsType) {
  const context = useContext(TranslationProfilesContext);
  const onRowOptionChange = (value: ProfileOnChangeOptionsType) => {
    props.onChange({[props.type]: value});
  };

  return (
    <Box id={`${props.type}_${props.id}`}>
      {Object.keys(rows).map((element) => {
        const {title = '', resourceType = '', permission = false, formatResourceId = (id: string) => id, fields = [], target = '', link = ''} =
          rows[element as keyof ResourcesOptionsRowsResults] || {};
        return (
          <TranslationProfilesRowOptions
            type={element}
            title={title}
            id={props.id}
            resourceType={resourceType}
            canCreateResource={permission}
            disabled={disabled}
            formatResourceId={formatResourceId}
            templateRows={fields}
            dataRows={props.dataRow?.[element as ResourcesOptionsRowsResultsKey]}
            onChange={onRowOptionChange}
            connectedUserId={context.data.connectedUserId}
            profileName={props.profileName}
            source={source}
            target={target}
            link={link}
            key={element}
            enabledNFA={props.enabledNFA}
            onProfileOptionsChange={props.onChange}
          />
        );
      })}
    </Box>
  );
}
