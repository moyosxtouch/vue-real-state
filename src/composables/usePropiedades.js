import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { computed } from "vue";

export default function usePropiedades() {
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, "propiedades"));
  const price = computed(() => {
    console.log("precio...");
  });
  return {
    propiedadesCollection,
    price,
  };
}
