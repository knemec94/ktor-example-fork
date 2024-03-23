import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useCreateNoteMutation, useNotesQuery } from "../../domain/note";
import { paths } from "../../util";
import styles from "./root-layout.module.scss";

export const RootLayout = () => {
  const { data } = useNotesQuery();
  const { mutateAsync } = useCreateNoteMutation();
  const navigate = useNavigate();

  const handleCreateNoteClick = () => {
    mutateAsync("").then((note) => navigate(paths.note(note.id)));
  };

  const getItemContents = (contents: string) => {
    if (!contents) {
      return "Empty note";
    }
    return contents.length > 40 ? `${contents.substring(0, 40)}...` : contents;
  };

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          {data?.array.map(({ id, contents }) => (
            <NavLink to={paths.note(id)} key={id}>
              {({ isActive }) => (
                <div
                  className={
                    isActive
                      ? [styles.linkItem, styles.active].join(" ")
                      : styles.linkItem
                  }
                >
                  {getItemContents(contents)}
                </div>
              )}
            </NavLink>
          ))}
        </div>
        <Button className={styles.create} onClick={handleCreateNoteClick}>
          Create new note
        </Button>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
