import { withProps, compose } from 'recompose';
import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { TagsLegend } from './TagsLegend';
import { TagLegendsPropsTypes } from './TagsLegend.type';
import { getTags } from '../../redux/Tag';
import { getFilters } from '../../redux/Filters';
import { filterTags } from '../../redux/Tag/tag.adapter';

const mapStateToProps = (state: RootState) => ({
  tags: getTags(state),
  filters: getFilters(state),
});

const mapDispatchToProps = () => ({});

const withFilteredTags = withProps(
  (ownerProps: TagLegendsPropsTypes): TagLegendsPropsTypes => {
    const filteredTags = filterTags(ownerProps.tags, ownerProps.filters);

    return {
      ...ownerProps,
      tags: filteredTags,
    };
  },
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFilteredTags,
  // @ts-ignore
)(TagsLegend);
