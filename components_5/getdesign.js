function getDescriptionWithStyling(eventName, description) {
  switch (eventName) {
    case "Mars bleu":
      return (
        <span>
          {description.split("cancer colorectal").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    padding: "0 2px",
                  }}
                >
                  cancer colorectal
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    case "Juin vert":
      return (
        <span>
          {description.split("cancer de l'uterus").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    padding: "0 2px",
                  }}
                >
                  cancer de l'utérus
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    case "Juillet noir":
      return (
        <span>
          {description.split("cancer de la peau").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    padding: "0 2px",
                  }}
                >
                  cancer de la peau
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    case "Novembre bleu-blanc":
      let [prostate, poumon] = description.split(" et ");
      prostate = (
        <span>
          {prostate.split("cancer de la prostate").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    padding: "0 2px",
                  }}
                >
                  cancer de la prostate
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
      poumon = (
        <span>
          {poumon.split("cancer du poumon").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    padding: "0 2px",
                    border: "1px solid grey",
                  }}
                >
                  cancer du poumon
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
      return (
        <span>
          {prostate} et {poumon}
        </span>
      );
    case "Septembre orange":
      return (
        <span>
          {description.split("cancer du sang").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "orange",
                    padding: "0 2px",
                  }}
                >
                  cancer du sang
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    case "Octobre rose":
      return (
        <span>
          {description.split("cancer du sein").map((part, index) =>
            index !== 0 ? (
              <span key={index}>
                <span
                  style={{
                    color: "white",
                    backgroundColor: "deeppink",
                    padding: "0 2px",
                  }}
                >
                  cancer du sein
                </span>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    default:
      return description; // default description
  }
}

export default getDescriptionWithStyling;
