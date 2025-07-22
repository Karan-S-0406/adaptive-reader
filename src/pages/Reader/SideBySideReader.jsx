import ReadingAssignment from "./ReadingAssignment";
import MathAssignment from "./MathAssignment";

export default function SideBySideReader({ selectedAssignment, storagePath }) {
  if (!selectedAssignment) return null;

  return (
    <div className="dual-reader-root">
      {/* Render based on type */}
      {selectedAssignment.type === "reading" ? (
        <ReadingAssignment
          selectedAssignment={selectedAssignment}
          storagePath={storagePath}
        />
      ) : (
        <MathAssignment
          storagePath={storagePath}
        />
      )}
    </div>
  );
}
