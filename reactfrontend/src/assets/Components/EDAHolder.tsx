const EdaHolder = () => {
  const notebookPath = '/public/EDA.html'; // Path to the HTML file in the public folder

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 3em)' }}>
      <iframe 
        src={notebookPath} 
        title="Jupyter Notebook"
        style={{ border: 'none', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EdaHolder;