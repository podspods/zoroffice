import { Segment as RawSegment } from '../EditorTable';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import ModalAddSegmentsBody, {ModalAddSegmentsBodyProps, Segment} from '@systran/react-components/lib/atoms/ModalAddSegmentsBody';
import { useCallback, useState } from 'react';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import { styled } from '@systran/react-components/lib/Theme';


export type CreateSegmentModalProps = {
  selectedRows?: RawSegment[];
  title: string;
  source: string;
  target: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (segment: Segment[]) => Promise<void>;
  initialSegments?: Segment[];
}

export default function CreateSegmentModal({title, source, target, selectedRows, open, onClose, onConfirm}: CreateSegmentModalProps) {
  const initialSegments = selectedRows && selectedRows.map((segment) => {
    return {
      source: segment.source,
      target: segment.target.seg,
      key: segment.id
    };
  }) || [{key: 'segment_0'}];

  const {t} = useTranslation();
  const [segments, setSegments] = useState<Segment[]>(initialSegments);

  const handleChange: ModalAddSegmentsBodyProps['handleChange'] = useCallback((key, target, event) => {
    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.key === key ? { ...segment, [target]: event.target.value } : segment
      )
    );
  }, []);

  const handleDelete: ModalAddSegmentsBodyProps['handleDelete'] = useCallback((key) => {
    setSegments((prevSegments) => prevSegments.filter((segment) => segment.key !== key));
  }, []);

  const handleAdd: ModalAddSegmentsBodyProps['handleAdd'] = () => {
    setSegments((prevSegments) => [...prevSegments, { key: `segment_${prevSegments.length + 1}` }]);
  };

  const handleConfirm = () => {
    onConfirm(segments);
  };

  const description = (<Description>
    {t('Add a new segments to Translation Memory')}
    {' ( '}
    <LanguagePairsRender
      source={source}
      target={target ?? undefined}
      localized
    />
    {' ) '}
  </Description>);

  return (
    <ConfirmModal
      width='extraLarge'
      title={t(title)}
      open={open}
      primaryActionText={t('Create')}
      onClose={onClose}
      onConfirm={handleConfirm}
    >

      <ModalAddSegmentsBody
        segments={segments}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        description={description}
      />
    </ConfirmModal>
  );
}

const Description = styled('div')`
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;
