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

const JobsOrderFormReview = () => {
  console.log('dasdasdasd');
  // const { entities } = jobOrder;
  // const endDate =
  //   jocl && formValues.start_date
  //     ? moment(formValues.start_date).add(jocl.days, 'days')
  //     : formValues.end_date;
  // const isEditOrder = useMemo(
  //   () => jobOrder.visibleModal === 'edit',
  //   [jobOrder.visibleModal]
  // );
  // const contractLength =
  //   formValues.contract_length_id === -1 ? 'Other' : jocl?.name;

  // const reviewOrderInfo = useMemo(() => {
  //   if (formValues.order_type === jobOrderTypes.Contract) {
  //     return [
  //       { name: 'Order Type', value: jobOrderTypesEn[formValues.order_type] },
  //       { name: 'Openings', value: `${formValues.openings}` },
  //       {
  //         name: 'Start Date',
  //         value: moment(formValues.start_date).format('MMM DD, YYYY'),
  //       },
  //       { name: 'Contract Length', value: contractLength },
  //       {
  //         name: 'End Date',
  //         value: endDate ? moment(endDate).format('MMM DD, YYYY') : null,
  //       },
  //     ];
  //   }
  //   if (formValues.order_type === jobOrderTypes.PerDiem) {
  //     const datesLabel = plural(
  //       'Start Date',
  //       'Start Dates',
  //       isEditOrder ? 1 : formValues.start_date?.length
  //     );
  //     const dates = [];

  //     formValues.start_dates?.forEach((date) => {
  //       let dateString = moment(date.date).format('MMM DD, YYYY');
  //       dateString += isEditOrder ? '' : `- Openings: ${date.openings}`;

  //       dates.push(<p className={`${css(margin.bottomNone)}`}>{dateString}</p>);
  //     });

  //     return [
  //       { name: 'Order Type', value: jobOrderTypesEn[formValues.order_type] },
  //       { name: datesLabel, value: dates },
  //     ];
  //   }
  //   return [];
  // }, [formValues, endDate, isEditOrder, contractLength]);

  // const budgetInfo = useMemo(() => {
  //   let info = [
  //     {
  //       name: 'Bonus',
  //       value: capitalize(formValues.has_bonus ? 'Yes' : 'No'),
  //     },
  //     {
  //       name: 'Guaranteed Hours',
  //       value: capitalize(
  //         formValues.guaranteed_hour_value &&
  //           formValues.guaranteed_hours &&
  //           formValues.order_type === jobOrderTypes.Contract
  //           ? `${formValues.guaranteed_hour_value} / week`
  //           : null
  //       ),
  //     },
  //   ];

  //   if (formValues.order_type === jobOrderTypes.PerDiem)
  //     info = info.filter((i) => i.name !== 'Guaranteed Hours');

  //   return info;
  // }, [
  //   formValues?.guaranteed_hour_value,
  //   formValues?.guaranteed_hours,
  //   formValues?.has_bonus,
  //   formValues?.order_type,
  // ]);

  return (
    <div className={`${styleBlock}`}>
      REVIEW
      {/* <div className={`${styleHeader}`}>
        <JobsOrderDetailsHeader
          showJobOrder={{
            ...formValues,
            end_date: endDate,
          }}
          entities={entities}
        />
        <Divider />
      </div>
      <Header as="h5" className={`${styleTitle}`}>
        Order Info
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
        Order Description
      </Header>
      <ReviewList data={[{ value: capitalize(formValues.description) }]} />
      {!isEditOrder && (
        <>
          <Header as="h5" className={`${styleTitle}`}>
            Order Notes
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

export default JobsOrderFormReview;
