// Generates accessor object properties to read and write mesh morph target influences by name
// https://github.com/maybeitsmark 
// 2026

export const createMorphTarget = (mesh, morphName) => {
  return {
    get value() {
      const index = mesh.morphTargetDictionary[morphName];
      return mesh.morphTargetInfluences[index];
    },
    set value(v) {
      const index = mesh.morphTargetDictionary[morphName];
      mesh.morphTargetInfluences[index] = v;
    },
  };
};