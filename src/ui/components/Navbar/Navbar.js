import React from "react";

import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navItems = [
    {
      label: t("common:home"),
      href: appRoutes.home.root,
    },
    {
      label: t("blog:graphomania"),
      href: "#graphomania",
    },
    {
      label: t("common:contacts"),
      href: null,
    },
    {
      label: t("common:about"),
      href: null,
    },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  function changeLanguage() {
    const languages = ["ru", "en"];
    const currentLanguage = i18n.language;
    let index = 0;
    if (currentLanguage === "ru") index = 1;
    if (currentLanguage === "en") index = 0;
    i18n.changeLanguage(languages[index]);
    localStorage.setItem("locale", languages[index]);
  }

  /*
  const intervalID = React.useRef(0);

  function startCountdown() {
    let counter = 0;
    intervalID.current = setInterval(() => {
      counter = counter + 1;
      if (counter > 2) {
        clearInterval(intervalID.current);
        history.push(appRoutes.admin.root);
      }
    }, 1000);
  }

  function finishCountdown() {
    clearInterval(intervalID.current);
  }
  */
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        align={"center"}
        borderColor="gray.200"
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "end", md: "space-between" }} align="center">
          {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text> */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction={"row"} spacing={4}>
              {navItems.map((navItem, i) => {
                return <DesktopNavItem {...navItem} key={i}></DesktopNavItem>;
              })}
            </Stack>
          </Flex>
          <Flex>
            <Button onClick={toggleColorMode} mr={[3, 5]}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button onClick={changeLanguage}>{i18n.language}</Button>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack p={4} display={{ md: "none" }}>
          {navItems.map((navItem, i) => {
            return <MobileNavItem {...navItem} key={i}></MobileNavItem>;
          })}
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNavItem = ({ label, href }) => {
  return (
    <Box key={label}>
      <Popover trigger={"hover"} placement={"bottom-start"}>
        <PopoverTrigger>
          <Text
            p={2}
            as={Link}
            to={href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            _hover={{
              textDecoration: "none",
            }}
          >
            {label}
          </Text>
        </PopoverTrigger>
      </Popover>
    </Box>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack p={4} display={{ md: "none" }}>
      <Flex
        py={2}
        as={Link}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
      </Flex>
    </Stack>
  );
};
