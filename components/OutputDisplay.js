export default function OutputDisplay({ result }) {
    return result ? (
      <div className="output">
        <p>{result}</p>
        <style jsx>{`
          .output {
            background: #e0f7fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
          }
        `}</style>
      </div>
    ) : null;
  }