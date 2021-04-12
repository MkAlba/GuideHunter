import GuidesList from '../../components/guides/guide-list/GuideList';




function Guides() {

  
  return (
    <div className="team-boxed">
      <div className="container">
        <div className="intro">
          <h2 className="text-center mb-1">Team </h2>
          <p className="text-center">All this professionals can help you to discover secrets in amazing city!!</p>
        </div>
        <GuidesList />
      </div>

    </div>

  );
}

export default Guides;