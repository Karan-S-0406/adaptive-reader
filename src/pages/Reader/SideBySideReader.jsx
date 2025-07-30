import MathAssignment from "./MathAssignment";
import ReadingAssignment from "./ReadingAssignment";

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
