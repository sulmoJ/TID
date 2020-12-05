class Shape:
    def __init__(self,x,y,width,height):
        self.x = x
        self.y = y
        self.w = width
        self.h = height

    def draw(self):
        pass

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

    def delete(self, k):
        pass

class Rectangle(Shape):
    def __init__(self,x,y,width,height):
        super().__init__(x,y,width,height)

    def draw(self):
        print('Rectangle :',self.x,self.y,self.w,self.h)

class Circle(Shape):
    def __init__(self,x,y,width,height):
        super().__init__(x,y,width,height)

    def draw(self):
        print('Circle :',self.x,self.y,self.w,self.h)

class Slide():
    def __init__(self):
        self.list = []

    def add(self,a):
        self.list.append(a)

    def paint(self):
        print("----paint start----")
        for r in self.list:
            r.draw()
        print("-------end---------")

    def move_all(self,dx,dy):
        for r in self.list:
            r.move(dx,dy)

    def delete(self, k):
        try:
            if type(k) == int :
                objectTemp = self.list[k]
                self.list.remove(objectTemp)
            else:
                self.list.remove(k)
        except:
            print("삭제함수 입력값이 잘못되었습니다.")

s = Slide()
r = Rectangle(50,50,10,10)
c = Circle(20,20,30,30)

s.add(r)
s.add(c)
s.paint()
r.move(7,-7)
c.move(77,-77)
s.paint()
s.move_all(100,100)
s.paint()
s.delete(1)
s.paint()
s.delete(r)
s.paint()
