import { Avatar, Button, Modal } from "antd";
import { getAuthor, getQuote, getUserName } from "../api/api";
import { useEffect, useState } from "react";
import "../styles/global.scss";

const Profile = () => {
  const [userName, setUserName] = useState("Username");
  const [authorName, setAuthorName] = useState("Author");
  const [quote, setQuote] = useState("Quote of the day is...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step1Status, setStep1Status] = useState("Requesting author...");
  const [step2Status, setStep2Status] = useState("Requesting quote...");
  const [controller, setController] = useState<AbortController | null>(null);

  const handleUpdate = async () => {
    setIsModalOpen(true);
    const abortController = new AbortController();
    setController(abortController);
    try {
      const responseAuthor = await getAuthor(abortController.signal);
      if (responseAuthor?.success) {
        setAuthorName(responseAuthor.data.name);
        setStep1Status("Requesting author... completed");
      } else {
        console.error("GetAuthor failed: ", responseAuthor?.data?.message);
      }

      const responseQuote = await getQuote(responseAuthor.data.authorId, abortController.signal);
      if (responseQuote?.success) {
        setQuote(responseQuote.data.quote);
        setStep2Status("Requesting quote... completed");
      } else {
        console.error("GetQuote failed: ", responseQuote?.data?.message);
      }
    } catch (error) {
      console.error("Request canceled or failed: ", error);
    }
  };

  const handleCancel = () => {
    if (controller) {
      controller.abort();
      setStep1Status("Requesting author... canceled");
      setStep2Status("Requesting quote... canceled");
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserName();
        if (response?.success) {
          setUserName(response.data.fullname);
        } else {
          console.error("GetUserInfo failed: ", response?.data?.message);
        }
      } catch (error) {
        console.error("GetUserInfo error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="profile__info">
        <Avatar className="profile__avatar" src="/assets/avatar.webp" size={150} />
        <div>
          <h2 className="profile__info__text">Welcome, {userName}!</h2>
          <Button className="profile__button" onClick={handleUpdate}>Update</Button>
        </div>
      </div>
      <p className="profile__quote">{authorName}: {quote}</p>

      <Modal
        title="Requesting the quote"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="profile__modal__step">{step1Status}</p>
        <p className="profile__modal__step">{step2Status}</p>
        <Button className="profile__modal__button" onClick={handleCancel}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default Profile;
