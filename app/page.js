"use client";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import {
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const q = query(collection(firestore, "inventory"));
    const docs = await getDocs(q);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (itemName = "defaultItemName") => {
    const docRef = doc(collection(firestore, "inventory"), itemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          quantity: quantity - 1,
        });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      gap={2}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Button variant="outlined" onClick={handleOpen}>
        Add Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
          border="2px solid #000"
          bgcolor="white"
          p={4}
          gap={3}
          borderRadius={4}
          boxShadow={24}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h4">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem();
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box border="1px solid #000" overflow="auto">
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Stack
        width="800px"
        height="300px"
        border="1px solid #000"
        overflow="auto"
      >
        {inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            bgcolor={"#ADD8E6"}
            justifyContent={"space-between"}
            display={"flex"}
            alignItems={"center"}
            padding={5}
          >
            <Typography variant="h3" color="#333" textAlign={"center"}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="#333" textAlign={"center"}>
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={() => addItem(name)}>
                Add
              </Button>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
export default Home;
