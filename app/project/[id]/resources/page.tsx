function ResourcesProject({ params }: { params: { id: string } }) {
  return (
    <>
      <p>Resources by {params.id}</p>
    </>
  );
}

export default ResourcesProject;
