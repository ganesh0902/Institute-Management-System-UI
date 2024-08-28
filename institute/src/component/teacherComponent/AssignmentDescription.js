 const AssignmentDescription = ({ description }) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: description }}
      />
    )
  }

export default AssignmentDescription  