import "./index.css";

const House = () => {
  return (
    <>
      <div className="house-wrap">
        <div className="house">
          <div className="floor"></div>
          <div className="wall">
            <div className="window"></div>
            <div className="door">
              <div className="door__square"></div>
              <div className="door__line"></div>
              <div className="door__square"></div>
            </div>
            <div className="window"></div>
          </div>
          <div className="top"></div>
          <div className="circle"></div>
          <div className="plastic">
            <div className="plastic__g">
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
              <div className="plastic__item" />
            </div>
          </div>
          <div className="line">
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
            <div className="line__item" />
          </div>
        </div>
        <div className="clouds">
          <div className="cloud">
            <div className="cloud__item"></div>
            <div className="cloud__item"></div>
          </div>
          <div className="cloud">
            <div className="cloud__item" />
            <div className="cloud__item" />
          </div>
          <div className="cloud">
            <div className="cloud__item" />
            <div className="cloud__item" />
          </div>
          <div className="bird" />
        </div>
        <div className="birds">
          <div className="bird" />
          <div className="bird" />
        </div>
        <div className="tree">
          <div className="tree__item" />
          <div className="tree__item" />
          <div className="tree__item" />
        </div>
        <div className="bush">
          <div className="bush__item" />
          <div className="bush__item" />
        </div>
        <div className="dot" />
      </div>
    </>
  );
};
export default House;
