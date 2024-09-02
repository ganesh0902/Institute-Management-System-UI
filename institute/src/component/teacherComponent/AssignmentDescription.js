 const AssignmentDescription = ({ description }) => {
    return (
      <div className="p-3"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    )
  }

export default AssignmentDescription  