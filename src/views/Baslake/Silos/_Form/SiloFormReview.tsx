import { padding } from '@utils/themeConstants';
import { css } from 'glamor';

// const capitalize = (s) =>
//   typeof s === TypeOf.string ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const styleBlock = css(padding.bottomXs);
// const styleHeader = css(padding.bottomXs);
// const styleTitle = css(margin.topNone, {
//   '& > span': {
//     fontSize: '20px !important',
//   },
// });

// const styleNote = css(padding.sm, padding.topNone, {
//   whiteSpace: 'pre-line',
// });

// const styleTable = css({
//   ' i': {
//     marginRight: '10px',
//   },
// });

// const styleLockIcon = css({
//   '&.inverted.circular.lock.icon': {
//     color: colors.greyIcon,
//   },
// });

// const styleUnlockIcon = css({
//   '&.inverted.circular.lock.icon': {
//     color: colors.green,
//   },
// });

const SiloFormReview = () => {
  // eslint-disable-next-line no-console
  console.log('dasdasdasd');

  return (
    <div className={`${styleBlock}`}>
      REVIEW
      {/* <div className={`${styleHeader}`}>
        <SiloDetailsHeader
          showJobOrder={{
            ...formValues,
            end_date: endDate,
          }}
          entities={entities}
        />
        <Divider />
      </div>
      <Header as="h5" className={`${styleTitle}`}>
        Cube Info
      </Header>
      <ReviewList data={reviewOrderInfo} joinData={false} />
      <Header as="h5" className={`${styleTitle}`}>
        Profession / Job
      </Header>
      <ReviewList
        data={[
          {
            name: 'Location',
            value:
              entities.locations &&
              entities.locations[formValues.location_id]?.name,
          },
          {
            name: 'Department',
            value:
              entities.departments &&
              entities.departments[formValues.department_id]?.name,
          },
        ]}
      />
      <ReviewList
        data={[
          {
            name: 'Job Title/Job Group',
            value: [
              ...formValues?.employer_job_titles
                ?.filter((job) => job?.type === 'employer_job_title')
                ?.map(
                  ({ id }) => entities.employer_job_titles[id]?.job_title.name
                ),
              ...formValues.employer_job_titles
                ?.filter((job) => job?.type === 'employer_job_title_group')
                ?.map(({ id }) => entities.employer_job_title_groups[id]?.name),
            ],
          },
        ]}
      />
      <Header as="h5" className={`${styleTitle}`}>
        Job Features
      </Header>
      <ReviewList
        data={[
          { name: 'Shift', value: entities.shifts[formValues.shift_id]?.name },
          { name: 'Break', value: `${formValues.break_length} minutes` },
        ]}
      />
      <Header as="h5" className={`${styleTitle}`}>
        Requirements
      </Header>
      <ReviewList
        data={[
          {
            name: 'Licenses',
            value: formValues.job_licenses?.map(
              (id) => entities.licenses[id]?.license
            ),
          },
        ]}
      />
      <ReviewList
        data={[
          {
            name: 'Certifications',
            value: formValues.job_certifications?.map(
              (id) => entities.certifications[id]?.description
            ),
          },
          {
            name: 'Skills / Experience',
            value: formValues.job_skills?.map(
              (id) => entities.skills[id]?.name
            ),
          },
        ]}
      />
      <ReviewList
        data={[
          {
            name: 'Preferred Qualifications - Certifications',
            value: formValues.preferred_qualifications?.certifications?.map(
              (id) => entities.certifications[id]?.description
            ),
          },
          {
            name: 'Preferred Qualifications - Skills / Experience',
            value: formValues.preferred_qualifications?.skills?.map(
              (id) => entities.skills[id]?.name
            ),
          },
        ]}
      />
      <When condition={formValues?.vms_approval_workflow_id}>
        <Header as="h5" className={`${styleTitle}`}>
          Approval
        </Header>
        <ReviewList
          data={[
            {
              name: 'Approval Type',
              value: capitalize(formValues.approval_type),
            },
          ]}
        />
      </When>
      <Header as="h5" className={`${styleTitle}`}>
        Budget
      </Header>
      <ReviewList data={budgetInfo} />
      <Header as="h5" className={`${styleTitle}`}>
        Cube Description
      </Header>
      <ReviewList data={[{ value: capitalize(formValues.description) }]} />
      {!isEditOrder && (
        <>
          <Header as="h5" className={`${styleTitle}`}>
            Cube Notes
          </Header>
          <div className={`${styleNote}`}>
            {formValues.notes?.length > 0 && formValues.notes[0].text ? (
              <Table basic="very" className={`${styleTable}`}>
                <Table.Body>
                  {formValues.notes.map((note) => (
                    <Table.Row key={note.id}>
                      <Table.Cell>
                        {note.is_internal ? (
                          <Icon
                            circular
                            inverted
                            className={`${styleLockIcon}`}
                            size="small"
                            name="lock"
                          />
                        ) : (
                          <Icon
                            circular
                            inverted
                            className={`${styleUnlockIcon}`}
                            size="small"
                            name="unlock"
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell className={`${styleNote}`}>
                        {note.text ?? 'n/a'}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <p>n/a</p>
            )}
          </div>
        </>
      )} */}
    </div>
  );
};

export default SiloFormReview;
