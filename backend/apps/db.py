from sqlmodel import Field, Session, SQLModel, create_engine, select

from apps.models import User

class BaseDatabase:
    def __init__(self):
        self.sqlite_file_name = "database.db"
        self.sqlite_url = f"sqlite:///{self.sqlite_file_name}"

        self.engine = create_engine(self.sqlite_url, echo=True)

        SQLModel.metadata.create_all(self.engine)


class Database(BaseDatabase):

    def __init__(self, model: SQLModel):
        self.model = model
        super().__init__()

    async def add_data(self, instance: SQLModel):
        with Session(self.engine) as session:
            session.add(instance)
            session.commit()

    async def select_all(self):
        with Session(self.engine) as session:
            statement = select(self.model)
            results = session.exec(statement)
            return results