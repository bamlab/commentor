import React from 'react';

import { FilterSectionPropsType } from './FilterSection.type';
import { DateRangeFilterSelector } from 'components/DateRangeFilterSelector';
import { FiltersContainer, Container, FiltersPrefix, FilterSpacer } from './FilterSection.style';
import { RepositoryIdsMultiSelect } from '../../../../components/RepositoryIdsMultiSelect';
import { TagMultiSelect } from '../../../../components/TagMultiSelect';
import { RequesterMultiSelect } from '../../../../components/RequesterMultiSelect';
import { CommentorMultiSelect } from '../../../../components/CommentorMultiSelect';

export const FilterSection = React.memo<FilterSectionPropsType>(props => {
  return (
    <Container>
      <DateRangeFilterSelector />
      <FiltersContainer>
        <FiltersPrefix>Filter by :</FiltersPrefix>
        <RepositoryIdsMultiSelect
          placeholder="Projects"
          noOptionsMessage="Nous ne trouvons pas de projets. Avez vous bien installé l'app commentor sur votre compte et sur votre repository ?"
        />
        <FilterSpacer />
        <TagMultiSelect placeholder="Tags" />
        <FilterSpacer />
        <RequesterMultiSelect placeholder="Requester" />
        <FilterSpacer />
        <CommentorMultiSelect placeholder="Commentors" />
      </FiltersContainer>
    </Container>
  );
});
