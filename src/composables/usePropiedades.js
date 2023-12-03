import { collection, doc, deleteDoc } from "firebase/firestore";
import { useCollection, useFirestore, useFirebaseStorage } from "vuefire";
import { computed, ref } from "vue";
import { ref as storageRef, deleteObject } from "firebase/storage";
export default function usePropiedades() {
  const alberca = ref(false);
  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, "propiedades"));
  async function deleteItem(id, urlImage) {
    if (confirm("¿Deseas eliminar esta propiedad?")) {
      const docRef = doc(db, "propiedades", id);
      const imageRef = storageRef(storage, urlImage);
      await Promise.all([
        await deleteDoc(docRef),
        await deleteObject(imageRef),
      ]);
    }
  }

  const filteredItems = computed(() => {
    return alberca.value
      ? propiedadesCollection.value.filter((propiedad) => propiedad.alberca)
      : propiedadesCollection.value;
  });

  return {
    propiedadesCollection,
    alberca,
    filteredItems,
    deleteItem,
  };
}
